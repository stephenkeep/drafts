
function quit {
osascript <<EOF
  tell application "node-webkit" to quit
EOF
}

quit
zip -r app.nw *
open app.nw