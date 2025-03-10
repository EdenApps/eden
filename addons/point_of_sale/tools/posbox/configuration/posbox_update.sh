#!/usr/bin/env bash

sudo service led-status stop

cd /home/pi/eden
localbranch=$(git symbolic-ref -q --short HEAD)
localremote=$(git config branch.$localbranch.remote)

if [[ "$(git remote get-url "$localremote")" != *eden/eden* ]]; then
    git remote set-url "${localremote}" "https://github.com/eden/eden.git"
fi

echo "addons/point_of_sale/tools/posbox/overwrite_after_init/home/pi/eden" >> .git/info/sparse-checkout

git fetch "${localremote}" "${localbranch}" --depth=1
git reset "${localremote}"/"${localbranch}" --hard

sudo git clean -dfx
if [ -d /home/pi/eden/addons/point_of_sale/tools/posbox/overwrite_after_init ]; then
    cp -a /home/pi/eden/addons/point_of_sale/tools/posbox/overwrite_after_init/home/pi/eden/* /home/pi/eden/
    rm -r /home/pi/eden/addons/point_of_sale/tools/posbox/overwrite_after_init
fi

# TODO: Remove this code when v16 is deprecated
eden_conf="addons/point_of_sale/tools/posbox/configuration/eden.conf"
if ! grep -q "server_wide_modules" $eden_conf; then
    echo "server_wide_modules=hw_drivers,hw_escpos,hw_posbox_homepage,point_of_sale,web" >> $eden_conf
fi

sudo service led-status start
