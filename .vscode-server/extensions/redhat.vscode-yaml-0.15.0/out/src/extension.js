/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Red Hat, Inc. All rights reserved.
 *  Copyright (c) Adam Voss. All rights reserved.
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const vscode_1 = require("vscode");
const vscode_languageclient_1 = require("vscode-languageclient");
const schema_extension_api_1 = require("./schema-extension-api");
const paths_1 = require("./paths");
const request_light_1 = require("request-light");
// eslint-disable-next-line @typescript-eslint/no-namespace
var SchemaAssociationNotification;
(function (SchemaAssociationNotification) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SchemaAssociationNotification.type = new vscode_languageclient_1.NotificationType('json/schemaAssociations');
})(SchemaAssociationNotification || (SchemaAssociationNotification = {}));
// eslint-disable-next-line @typescript-eslint/no-namespace
var VSCodeContentRequestRegistration;
(function (VSCodeContentRequestRegistration) {
    // eslint-disable-next-line @typescript-eslint/ban-types
    VSCodeContentRequestRegistration.type = new vscode_languageclient_1.NotificationType('yaml/registerVSCodeContentRequest');
})(VSCodeContentRequestRegistration || (VSCodeContentRequestRegistration = {}));
// eslint-disable-next-line @typescript-eslint/no-namespace
var VSCodeContentRequest;
(function (VSCodeContentRequest) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    VSCodeContentRequest.type = new vscode_languageclient_1.RequestType('vscode/content');
})(VSCodeContentRequest || (VSCodeContentRequest = {}));
// eslint-disable-next-line @typescript-eslint/no-namespace
var DynamicCustomSchemaRequestRegistration;
(function (DynamicCustomSchemaRequestRegistration) {
    // eslint-disable-next-line @typescript-eslint/ban-types
    DynamicCustomSchemaRequestRegistration.type = new vscode_languageclient_1.NotificationType('yaml/registerCustomSchemaRequest');
})(DynamicCustomSchemaRequestRegistration || (DynamicCustomSchemaRequestRegistration = {}));
let client;
function activate(context) {
    // The YAML language server is implemented in node
    const serverModule = context.asAbsolutePath(path.join('node_modules', 'yaml-language-server', 'out', 'server', 'src', 'server.js'));
    // The debug options for the server
    const debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };
    // If the extension is launched in debug mode then the debug server options are used
    // Otherwise the run options are used
    const serverOptions = {
        run: { module: serverModule, transport: vscode_languageclient_1.TransportKind.ipc },
        debug: { module: serverModule, transport: vscode_languageclient_1.TransportKind.ipc, options: debugOptions },
    };
    // Options to control the language client
    const clientOptions = {
        // Register the server for on disk and newly created YAML documents
        documentSelector: [{ language: 'yaml' }],
        synchronize: {
            // Synchronize these setting sections with the server
            configurationSection: ['yaml', 'http.proxy', 'http.proxyStrictSSL', 'editor.tabSize', '[yaml]'],
            // Notify the server about file changes to YAML and JSON files contained in the workspace
            fileEvents: [vscode_1.workspace.createFileSystemWatcher('**/*.?(e)y?(a)ml'), vscode_1.workspace.createFileSystemWatcher('**/*.json')],
        },
        revealOutputChannelOn: vscode_languageclient_1.RevealOutputChannelOn.Never,
    };
    // Create the language client and start it
    client = new vscode_languageclient_1.LanguageClient('yaml', 'YAML Support', serverOptions, clientOptions);
    const disposable = client.start();
    const schemaExtensionAPI = new schema_extension_api_1.SchemaExtensionAPI(client);
    // Push the disposable to the context's subscriptions so that the
    // client can be deactivated on extension deactivation
    context.subscriptions.push(disposable);
    client.onReady().then(() => {
        // Send a notification to the server with any YAML schema associations in all extensions
        client.sendNotification(SchemaAssociationNotification.type, getSchemaAssociations());
        // If the extensions change, fire this notification again to pick up on any association changes
        vscode_1.extensions.onDidChange(() => {
            client.sendNotification(SchemaAssociationNotification.type, getSchemaAssociations());
        });
        // Tell the server that the client is ready to provide custom schema content
        client.sendNotification(DynamicCustomSchemaRequestRegistration.type);
        // Tell the server that the client supports schema requests sent directly to it
        client.sendNotification(VSCodeContentRequestRegistration.type);
        // If the server asks for custom schema content, get it and send it back
        client.onRequest(schema_extension_api_1.CUSTOM_SCHEMA_REQUEST, (resource) => {
            return schemaExtensionAPI.requestCustomSchema(resource);
        });
        client.onRequest(schema_extension_api_1.CUSTOM_CONTENT_REQUEST, (uri) => {
            return schemaExtensionAPI.requestCustomSchemaContent(uri);
        });
        client.onRequest(VSCodeContentRequest.type, (uri) => {
            const httpSettings = vscode_1.workspace.getConfiguration('http');
            request_light_1.configure(httpSettings.http && httpSettings.http.proxy, httpSettings.http && httpSettings.http.proxyStrictSSL);
            const headers = { 'Accept-Encoding': 'gzip, deflate' };
            return request_light_1.xhr({ url: uri, followRedirects: 5, headers }).then((response) => {
                return response.responseText;
            }, (error) => {
                return Promise.reject(error.responseText || request_light_1.getErrorStatusDescription(error.status) || error.toString());
            });
        });
    });
    return schemaExtensionAPI;
}
exports.activate = activate;
function getSchemaAssociations() {
    const associations = [];
    vscode_1.extensions.all.forEach((extension) => {
        const packageJSON = extension.packageJSON;
        if (packageJSON && packageJSON.contributes && packageJSON.contributes.yamlValidation) {
            const yamlValidation = packageJSON.contributes.yamlValidation;
            if (Array.isArray(yamlValidation)) {
                yamlValidation.forEach((jv) => {
                    // eslint-disable-next-line prefer-const
                    let { fileMatch, url } = jv;
                    if (typeof fileMatch === 'string') {
                        fileMatch = [fileMatch];
                    }
                    if (Array.isArray(fileMatch) && typeof url === 'string') {
                        let uri = url;
                        if (uri[0] === '.' && uri[1] === '/') {
                            uri = paths_1.joinPath(extension.extensionUri, uri).toString();
                        }
                        fileMatch = fileMatch.map((fm) => {
                            if (fm[0] === '%') {
                                fm = fm.replace(/%APP_SETTINGS_HOME%/, '/User');
                                fm = fm.replace(/%MACHINE_SETTINGS_HOME%/, '/Machine');
                                fm = fm.replace(/%APP_WORKSPACES_HOME%/, '/Workspaces');
                            }
                            else if (!fm.match(/^(\w+:\/\/|\/|!)/)) {
                                fm = '/' + fm;
                            }
                            return fm;
                        });
                        associations.push({ fileMatch, uri });
                    }
                });
            }
        }
    });
    return associations;
}
function logToExtensionOutputChannel(message) {
    client.outputChannel.appendLine(message);
}
exports.logToExtensionOutputChannel = logToExtensionOutputChannel;
//# sourceMappingURL=extension.js.map