#!/bin/bash

echo "Installing necessary plugins..."

PLUGIN_LIST=("plugin1" "plugin2" "plugin3")
TOTAL_PLUGINS=${#PLUGIN_LIST[@]}
CURRENT_PLUGIN=0

for PLUGIN in "${PLUGIN_LIST[@]}"; do
    CURRENT_PLUGIN=$((CURRENT_PLUGIN + 1))
    whiptail --title "Plugin Installation" --gauge "Installing $PLUGIN ($CURRENT_PLUGIN of $TOTAL_PLUGINS)..." 8 50 $((CURRENT_PLUGIN * 100 / TOTAL_PLUGINS)) &
    PID=$!
    if ! sudo apt-get install -y "$PLUGIN" > /dev/null 2>&1; then
        kill $PID
        echo "Failed to install $PLUGIN. Skipping..."
        continue
    fi
    kill $PID
done

whiptail --title "Plugin Installation" --msgbox "All plugins processed successfully." 8 50
