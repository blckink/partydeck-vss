var flagPath = Qt.homePath() + "/.local/share/partydeck/splitscreen_vertical.flag";

function fileExists(path) {
    var file = new QFile(path);
    var exists = file.exists();
    file.close();
    return exists;
}

var verticalSplitscreen = fileExists(flagPath);
print("Vertical flag detected: " + verticalSplitscreen);

scrwidth = workspace.activeScreen.geometry.width;
scrheight = workspace.activeScreen.geometry.height;

// 1-Player Layout
Xpos_1p = [0];
Ypos_1p = [0];
Xsize_1p = [scrwidth];
Ysize_1p = [scrheight];

// 2-Player Layout
if (verticalSplitscreen) {
    Xpos_2p = [0, scrwidth / 2];
    Ypos_2p = [0, 0];
    Xsize_2p = [scrwidth / 2, scrwidth / 2];
    Ysize_2p = [scrheight, scrheight];
} else {
    Xpos_2p = [0, 0];
    Ypos_2p = [0, scrheight / 2];
    Xsize_2p = [scrwidth, scrwidth];
    Ysize_2p = [scrheight / 2, scrheight / 2];
}

// 3-Player Layout
Xpos_3p = [0, 0, scrwidth / 2];
Ypos_3p = [0, scrheight / 2, scrheight / 2];
Xsize_3p = [scrwidth, scrwidth / 2, scrwidth / 2];
Ysize_3p = [scrheight / 2, scrheight / 2, scrheight / 2];

// 4-Player Layout
Xpos_4p = [0, scrwidth / 2, 0, scrwidth / 2];
Ypos_4p = [0, 0, scrheight / 2, scrheight / 2];
Xsize_4p = [scrwidth / 2, scrwidth / 2, scrwidth / 2, scrwidth / 2];
Ysize_4p = [scrheight / 2, scrheight / 2, scrheight / 2, scrheight / 2];

function gamescopeSplitscreen() {
    var allClients = workspace.windowList();
    var gamescopeClients = [];

    for (var i = 0; i < allClients.length; i++) {
        if (allClients[i].resourceClass == 'gamescope') {
            gamescopeClients.push(allClients[i]);
        }
    }

    var Xpos, Ypos, Xsize, Ysize;

    switch (gamescopeClients.length) {
        case 0:
            return;
        case 1:
            Xpos = Xpos_1p;
            Ypos = Ypos_1p;
            Xsize = Xsize_1p;
            Ysize = Ysize_1p;
            break;
        case 2:
            Xpos = Xpos_2p;
            Ypos = Ypos_2p;
            Xsize = Xsize_2p;
            Ysize = Ysize_2p;
            break;
        case 3:
            Xpos = Xpos_3p;
            Ypos = Ypos_3p;
            Xsize = Xsize_3p;
            Ysize = Ysize_3p;
            break;
        case 4:
            Xpos = Xpos_4p;
            Ypos = Ypos_4p;
            Xsize = Xsize_4p;
            Ysize = Ysize_4p;
            break;
    }

    for (var i = 0; i < gamescopeClients.length; i++) {
        gamescopeClients[i].noBorder = true; // Set borderless
        gamescopeClients[i].frameGeometry = {
            x: Xpos[i],
            y: Ypos[i],
            width: Xsize[i],
            height: Ysize[i]
        };
    }
}

workspace.windowAdded.connect(gamescopeSplitscreen);
workspace.windowRemoved.connect(gamescopeSplitscreen);
