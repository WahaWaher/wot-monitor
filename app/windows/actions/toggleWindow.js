const toggleWindow = (win) => (win.isVisible() ? win.hide() : win.show());

module.exports = toggleWindow;
