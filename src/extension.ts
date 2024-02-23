import * as vscode from 'vscode';

const CMND = 'peek';

let locationsList: vscode.Location[] = [];

export async function activate(context: vscode.ExtensionContext) {
    await setContext(false);

    context.subscriptions.push(
        vscode.commands.registerCommand(`${CMND}.current`, async () => {
            const editor = vscode.window.activeTextEditor;

            if (editor && locationsList.length) {
                const { selection, document } = editor;
                const uri = document.uri;

                await vscode.commands.executeCommand(
                    'editor.action.peekLocations',
                    uri,
                    selection.active,
                    locationsList.length ? locationsList : getLocations(editor),
                    'peek',
                );
            }
        }),
        vscode.commands.registerCommand(`${CMND}.addLocations`, async () => {
            const editor = vscode.window.activeTextEditor;

            if (editor) {
                await setContext(true);

                locationsList.push(...getLocations(editor));
            }
        }),
        vscode.commands.registerCommand(`${CMND}.clearLocations`, async () => {
            await setContext(false);
            locationsList = [];
        }),
    );
}

function getLocations(editor: vscode.TextEditor) {
    const { selections, document } = editor;
    const uri = document.uri;

    return selections.map((item: vscode.Selection) => {
        const range = item.isEmpty
            ? document.lineAt(item.start.line).range
            : item;

        return new vscode.Location(uri, range);
    });
}

function setContext(val, key = 'hasPeekList') {
    return vscode.commands.executeCommand('setContext', key, val);
}

export function deactivate() { }
