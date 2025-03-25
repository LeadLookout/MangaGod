#!/bin/bash

echo "Starting application setup..."

# ...existing code...

# Function to manage bookmarks
manage_bookmarks() {
    local BOOKMARKS_FILE="./bookmarks.txt"
    touch "$BOOKMARKS_FILE"

    while true; do
        CHOICE=$(whiptail --title "Bookmark Manager" --menu "Choose an option:" 15 60 4 \
            "1" "Add a bookmark" \
            "2" "View bookmarks" \
            "3" "Remove a bookmark" \
            "4" "Exit" 3>&1 1>&2 2>&3)

        case $CHOICE in
            1)
                BOOKMARK=$(whiptail --title "Add Bookmark" --inputbox "Enter the page or book to bookmark:" 10 60 3>&1 1>&2 2>&3)
                if [[ -n "$BOOKMARK" ]]; then
                    echo "$BOOKMARK" >> "$BOOKMARKS_FILE"
                    whiptail --title "Success" --msgbox "Bookmark added successfully!" 8 50
                else
                    whiptail --title "Error" --msgbox "No bookmark entered." 8 50
                fi
                ;;
            2)
                BOOKMARKS=$(cat "$BOOKMARKS_FILE")
                whiptail --title "View Bookmarks" --msgbox "Bookmarks:\n$BOOKMARKS" 15 60
                ;;
            3)
                BOOKMARK=$(whiptail --title "Remove Bookmark" --inputbox "Enter the bookmark to remove:" 10 60 3>&1 1>&2 2>&3)
                if [[ -n "$BOOKMARK" ]]; then
                    sed -i "/^$BOOKMARK$/d" "$BOOKMARKS_FILE"
                    whiptail --title "Success" --msgbox "Bookmark removed successfully!" 8 50
                else
                    whiptail --title "Error" --msgbox "No bookmark entered." 8 50
                fi
                ;;
            4)
                break
                ;;
            *)
                whiptail --title "Error" --msgbox "Invalid option." 8 50
                ;;
        esac
    done
}

# Add a menu option to manage bookmarks
if whiptail --title "Setup Options" --yesno "Do you want to manage bookmarks?" 8 50; then
    manage_bookmarks
fi

# Display a menu to confirm plugin installation
if whiptail --title "Setup Confirmation" --yesno "Do you want to install necessary plugins?" 8 50; then
    # Check if install_plugins.sh exists and is executable
    if [[ -x ./install_plugins.sh ]]; then
        bash ./install_plugins.sh || { whiptail --title "Error" --msgbox "Plugin installation failed. Exiting setup." 8 50; exit 1; }
    else
        whiptail --title "Error" --msgbox "install_plugins.sh not found or not executable. Exiting setup." 8 50
        exit 1
    fi
else
    whiptail --title "Setup Skipped" --msgbox "Plugin installation skipped by the user." 8 50
fi

# ...existing code...

whiptail --title "Setup Complete" --msgbox "Setup completed successfully." 8 50
