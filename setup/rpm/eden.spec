%global name eden
%global release 1
%global unmangled_version %{version}
%global __requires_exclude ^.*eden/addons/mail/static/scripts/eden-mailgate.py$

Summary: Eden Server
Name: %{name}
Version: %{version}
Release: %{release}
Source0: %{name}-%{unmangled_version}.tar.gz
License: LGPL-3
Group: Development/Libraries
BuildRoot: %{_tmppath}/%{name}-%{version}-%{release}-buildroot
Prefix: %{_prefix}
BuildArch: noarch
Vendor: Eden Cloud <info@edencloud.us>
Requires: sassc
BuildRequires: python3-devel
BuildRequires: pyproject-rpm-macros
Url: https://www.edencloud.us

%description
Eden is a complete ERP and CRM. The main features are accounting (analytic
and financial), stock management, sales and purchases management, tasks
automation, marketing campaigns, help desk, POS, etc. Technical features include
a distributed server, an object database, a dynamic GUI,
customizable reports, and XML-RPC interfaces.

%generate_buildrequires
%pyproject_buildrequires

%prep
%autosetup

%build
%py3_build

%install
%py3_install

%post
#!/bin/sh

set -e

EDEN_CONFIGURATION_DIR=/etc/eden
EDEN_CONFIGURATION_FILE=$EDEN_CONFIGURATION_DIR/eden.conf
EDEN_DATA_DIR=/var/lib/eden
EDEN_GROUP="eden"
EDEN_LOG_DIR=/var/log/eden
EDEN_LOG_FILE=$EDEN_LOG_DIR/eden-server.log
EDEN_USER="eden"

if ! getent passwd | grep -q "^eden:"; then
    groupadd $EDEN_GROUP
    adduser --system --no-create-home $EDEN_USER -g $EDEN_GROUP
fi
# Register "$EDEN_USER" as a postgres user with "Create DB" role attribute
su - postgres -c "createuser -d -R -S $EDEN_USER" 2> /dev/null || true
# Configuration file
mkdir -p $EDEN_CONFIGURATION_DIR
# can't copy debian config-file as addons_path is not the same
if [ ! -f $EDEN_CONFIGURATION_FILE ]
then
    echo "[options]
; This is the password that allows database operations:
; admin_passwd = admin
db_host = False
db_port = False
db_user = $EDEN_USER
db_password = False
addons_path = %{python3_sitelib}/eden/addons
default_productivity_apps = True
" > $EDEN_CONFIGURATION_FILE
    chown $EDEN_USER:$EDEN_GROUP $EDEN_CONFIGURATION_FILE
    chmod 0640 $EDEN_CONFIGURATION_FILE
fi
# Log
mkdir -p $EDEN_LOG_DIR
chown $EDEN_USER:$EDEN_GROUP $EDEN_LOG_DIR
chmod 0750 $EDEN_LOG_DIR
# Data dir
mkdir -p $EDEN_DATA_DIR
chown $EDEN_USER:$EDEN_GROUP $EDEN_DATA_DIR

INIT_FILE=/lib/systemd/system/eden.service
touch $INIT_FILE
chmod 0700 $INIT_FILE
cat << EOF > $INIT_FILE
[Unit]
Description=Eden Open Source ERP and CRM
After=network.target

[Service]
Type=simple
User=eden
Group=eden
ExecStart=/usr/bin/eden --config $EDEN_CONFIGURATION_FILE --logfile $EDEN_LOG_FILE
KillMode=mixed

[Install]
WantedBy=multi-user.target
EOF


%files
%{_bindir}/eden
%{python3_sitelib}/%{name}-*.egg-info
%{python3_sitelib}/%{name}
