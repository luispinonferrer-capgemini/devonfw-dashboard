import { createConnection } from "typeorm";
import { Item } from "../../assets/model/item.schema";
import { ipcMain, BrowserWindow } from "electron";
import ipcHandler from "./ipcHandler";
import { Workspace } from "../../assets/model/workspace.schema";

export enum actions {
    GET_ITEMS = 'db.get-items',
    ADD_ITEM = 'db.add-item',
    DELETE_ITEM = 'db.delete-item',
    ADD_WORKSPACE = 'db.add-workspace',
    GET_WORKSPACES = 'db.get-workspaces'
}

export default class Database implements ipcHandler {

    public static actions = actions;

    public async init(win: BrowserWindow): Promise<void> {
        const connection = await createConnection({
            type: 'sqlite',
            synchronize: true,
            logging: true,
            logger: 'simple-console',
            database: './data/database.sqlite',
            entities: [Item, Workspace],
        });

        const itemRepo = connection.getRepository(Item);
        const workspaceRepo = connection.getRepository(Workspace);

        ipcMain.on(actions.GET_ITEMS, async (event: any, ...args: any[]) => {
            try {
                event.returnValue = await itemRepo.find();
            } catch (err) {
                throw err;
            }
        });

        ipcMain.on(actions.ADD_ITEM, async (event: any, _item: Item) => {
            try {
                const item = await itemRepo.create(_item);
                await itemRepo.save(item);
                event.returnValue = await itemRepo.find();
            } catch (err) {
                throw err;
            }
        });

        ipcMain.on(actions.DELETE_ITEM, async (event: any, _item: Item) => {
            try {
                const item = await itemRepo.create(_item);
                await itemRepo.remove(item);
                event.returnValue = await itemRepo.find();
            } catch (err) {
                throw err;
            }
        });

        ipcMain.on(actions.ADD_WORKSPACE, async (event: any, _workspace: Workspace) => {
            try {
                const workspace = await workspaceRepo.create(_workspace);
                await workspaceRepo.save(workspace);
                event.returnValue = await workspaceRepo.find();
            } catch (err) {
                throw err;
            }
        });

        ipcMain.on(actions.GET_WORKSPACES, async (event: any, ...args: any[]) => {
            try {
                event.returnValue = await workspaceRepo.find();
            } catch (err) {
                throw err;
            }
        });
    }
}