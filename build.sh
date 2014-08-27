
function quit {
osascript <<EOF
  tell application "node-webkit" to quit
EOF
}

quit

export NODE_PATH=.
browserify main.js -o build/app.js
cd build
zip -r app.nw *
#open app.nw
http-server .