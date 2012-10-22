
module scaffold.ui {
    export class ApplicationWindow {
        private window : TitaniumUIWindowStatic;
        private view : IMainView;

        constructor () {
            this.window = Ti.UI.createWindow();
            this.window.backgroundColor = 'black';

            if (Ti.Platform.osname === 'ipad') {
                this.view = new scaffold.ui.ipad.MainView();
            }
            else {
                this.view = new scaffold.ui.iphone.MainView();
            }

            this.view.attach(this.window);
        }

        show () {
            this.window.open();
        }
    }
}
