Eden
----
![Eden Logo](eden/addons/base/static/img/logo-white.png)
Eden is a suite of web based open source business apps. 

These apps are designed to help provide a starting point to run your business, providing a springboard to build a business of any type.

Eden Apps can be used as stand-alone applications, but they also integrate seamlessly so you get
a full-featured business platform when you install several applications.

Getting started with Eden for Development (WSL/Ubuntu)
-------------------------

Pre-Reqs
* Python3 - We recommend using [Mise](https://github.com/jdx/mise?tab=readme-ov-file) to manage python ande nodejs version
* NodeJS 22.x.x - Used for EdenUI and some Bootstrap features.
* PostgreSQL ```sudo apt install postgresql postgresql-client```
   * Configure DB ```sudo -u postgres createuser -d -R -S $USER && createdb $USER```

Install and Run
1. Clone the repo ```git clone https://github.com/edenapps/eden```
2. Change Directory ```cd eden```
3. Install OS Dependencies ```sudo apt install build-essential libpq-dev libldap2-dev libsasl2-dev```
4. Install Python Dependencies ```pip install setuptools wheel && pip install -r requirements.txt```
5. Launch Eden ```python eden-bin --addons-path=addons -d edendb``` OR ```python eden-bin --addons-path=addons -d edendb --dev xml,reload --test-enable``` for devMode

Congratulations! Eden is now available at port 8042!
Complete dev instructions coming soon.
