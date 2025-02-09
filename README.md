Eden
----

Eden is a suite of web based open source business apps. 

These apps are designed to help provide a starting point to run your business, providing a springboard to build a business of any type.

Eden Apps can be used as stand-alone applications, but they also integrate seamlessly so you get
a full-featured business platform when you install several applications.

Getting started with Eden for Development (MacOS)
-------------------------

Pre-Reqs
* Python3
* PostgreSQL (Via [Postgres.app](https://postgresapp.com/))

Install and Run
1. Clone the repo ```git clone https://github.com/edenapps/eden```
2. Change Directory ```cd eden```
3. Install Dependencies ```pip install setuptools wheel && pip install -r requirements.txt```
4. Launch Eden ```python eden-bin --addons-path=addons -d edendb``` OR ```python eden-bin --addons-path=addons -d edendb --dev xml,reload --test-enable``` for devMode

Complete dev instructions coming soon.
