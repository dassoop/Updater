const { app, BrowserWindow, ipcMain , Menu , autoUpdater} = require('electron');
const path = require('path');
const functions = require('./functions.js')

const server = "https://updater-hazel.vercel.app/"
const url = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL({ url })

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  var menu = Menu.buildFromTemplate([
    {
      label: 'Menu',
      submenu: [
        // {
        //   label: 'Info'
        //   ,click()
        //   {

        //   }
        // },
        {
          type: 'separator'
        },
        {
          label: 'Exit'
          ,click()
          {
            app.quit()
          }
        }
      ]
    },
    {
      label: 'Info',
      submenu: [
        {
          label: 'Instructions'
          ,click()
          {

          }
        },
      ]
    }
  ])
  Menu.setApplicationMenu(menu)

  mainWindow.on('close', (event) =>
	{
		if(app.quitting)
		{
			mainWindow = null;
		}

		else
		{
			event.preventDefault();
			mainWindow.hide();
		}
	});

  ipcMain.handle('req', async (event, req) => {
    res = 
    {
      error: null, 
      body: {}
    };

    return functions.req(req, res);
  })

  mainWindow.loadFile(path.join(__dirname, '/view/html/index.html'));
  mainWindow.webContents.openDevTools();
};

app.on('ready', createWindow);
app.on('activate', () => { mainWindow.show(); });
app.on('before-quit', () => { app.quitting = true; });

app.whenReady().then(() => {});

