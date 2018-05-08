#!/usr/bin/python
# -*- coding: utf-8 -*-
 
import os, sys;
import psycopg2;

def create(username, dbname, password):
    """
    Creates an standard data base instance with the given name. 
    The given password will be used to connect to the DB
    The given user will also be created.
    """
    print('Creating user: sudo -u %s createuser -D -A -P %s'%(username, username));
    # Create the user
    os.system('sudo -u %s createuser -D -A -P %s'%(username, username));
    print('Creating DB: sudo -u %s createdb -O %s %s'%(username, username, dbname));
    # Create the data base and give the user access
    os.system('sudo -u %s createdb -O %s %s'%(username, username, dbname));
     
    # Used to track the current position in the database
    con = None;
     
    try:
        # Connect to the data base
        con = psycopg2.connect("host='localhost' dbname='%s' user='%s' password='%s'"%(dbname, username, password));
        # Create the cursor objet that tracks positions in the data base
        cur = con.cursor();
        cur.execute("CREATE TABLE IF NOT EXISTS Products(Id INTEGER PRIMARY KEY, Name VARCHAR(20), Price INTEGER, Description VARCHAR(50))");
        cur.execute("CREATE TABLE IF NOT EXISTS Layer(Id INTEGER PRIMARY KEY, ProductID INTEGER, Name VARCHAR(20), Description VARCHAR(50))");
        cur.execute("CREATE TABLE IF NOT EXISTS RobotState(Id INTEGER PRIMARY KEY, ProductID INTEGER, LayerID INTEGER, PowderID INTEGER, TimeStamp VARCHAR(30), Name VARCHAR(20), Description VARCHAR(50))");
        cur.execute("CREATE TABLE IF NOT EXISTS ProcessState(Id INTEGER PRIMARY KEY, ProductID INTEGER, LayerID INTEGER, PowderID INTEGER, TimeStamp VARCHAR(30), Name VARCHAR(20), Description VARCHAR(50))");
        cur.execute("CREATE TABLE IF NOT EXISTS PowderState(Id INTEGER PRIMARY KEY, ProductID INTEGER, LayerID INTEGER, PowderID INTEGER, TimeStamp VARCHAR(30), Name VARCHAR(20), Description VARCHAR(50))");
        cur.execute("CREATE TABLE IF NOT EXISTS Substrate(Id INTEGER PRIMARY KEY, ProductID INTEGER, LayerID INTEGER, PowderID INTEGER, Name VARCHAR(20), Description VARCHAR(50))");
        cur.execute("CREATE TABLE IF NOT EXISTS Powder(Id INTEGER PRIMARY KEY, ProductID INTEGER, LayerID INTEGER,  Name VARCHAR(20), Description VARCHAR(50))");
        # Push the modifications to the DB
        con.commit();
    except psycopg2.DatabaseError, e:
        if con:
            con.rollback();
     
        print 'Error %s' % e  ;  
        sys.exit(1);
     
    finally:   
        if con:
            con.close();

def selectData(username, dbname, password, table):
    con = None;
 
    try:
        con = psycopg2.connect("host='localhost' dbname='%s' user='%s' password='%s'"%(dbname, username, password));
        cur = con.cursor();
        cur.execute("SELECT * FROM %s"%(table));
     
        while True:
            row = cur.fetchone();
     
            if row == None:
                break;
     
            print("Product: " + row[1] + "\t\tPrice: " + str(row[2]));
     
    except psycopg2.DatabaseError, e:
        if con:
            con.rollback();
     
        print 'Error %s' % e    
        sys.exit(1);
     
    finally:   
        if con:
            con.close();

def updateData(username, dbname, password, table):
    con = None
 
    try:
        con = psycopg2.connect("host='localhost' dbname='%s' user='%s' password='%s'"%(dbname, username, password));  
        cur = con.cursor();
        cur.execute("UPDATE %s SET Price=%s WHERE Id=%s", (10, 4)%(table));
        con.commit();
    except psycopg2.DatabaseError, e:
        if con:
            con.rollback();
     
        print 'Error %s' % e; 
        sys.exit(1);
     
    finally:   
        if con:
            con.close();

def deleteData(username, dbname, password, table):
    con = None
 
    try:
        con = psycopg2.connect("host='localhost' dbname='%s' user='%s' password='%s'"%(dbname, username, password)); 
        cur = con.cursor();
        cur.execute("DELETE FROM %s WHERE Id=%d"%(table, 4));
        con.commit();
    except psycopg2.DatabaseError, e:
        if con:
            con.rollback();
     
        print 'Error %s' % e;
        sys.exit(1);
     
    finally:   
        if con:
            con.close();

def loadData(username, dbname, password, csv_path):
    con = None
 
    try:
        con = psycopg2.connect("host='localhost' dbname='%s' user='%s' password='%s'"%(dbname, username, password));  
        cur = con.cursor();
        with open(csv_path, 'r+') as f: cur.copy_from(f, temp_unicommerce_status, sep=',')
        con.commit();
    except psycopg2.DatabaseError, e:
        if con:
            con.rollback();
     
        print 'Error %s' % e; 
        sys.exit(1);
     
    finally:   
        if con:
            con.close();

# To create the data base several arguments must be passed in
'''
username = sys.argv[1];
dbname = sys.argv[2];
password = sys.argv[3];

create(username, dbname, password);
'''
selectData('katherinemetcalf', 'testdb', 'password', 'products');

updateData('katherinemetcalf', 'testdb', 'password', 'products');

deleteData('katherinemetcalf', 'testdb', 'password', 'products');

