DROP TABLE IF EXISTS FrugalFinderDB.StoreProducts;
DROP TABLE IF EXISTS FrugalFinderDB.Stores;
DROP TABLE IF EXISTS FrugalFinderDB.ProductInfo;
DROP TABLE IF EXISTS FrugalFinderDB.Users;
DROP TABLE IF EXISTS FrugalFinderDB.OrderHistory;
DROP TABLE IF EXISTS FrugalFinderDB.ProductOrderHistory;
DROP TABLE IF EXISTS FrugalFinderDB.Coupons;

CREATE TABLE Stores (
sid INTEGER PRIMARY KEY,
name TEXT,
address TEXT,
longitudeStore TEXT,
latitudeStore TEXT
);

CREATE TABLE ProductInfo (
upc INTEGER PRIMARY KEY,
name TEXT,
address TEXT,
longitudeStore TEXT,
latitudeStore TEXT
);

CREATE TABLE StoreProducts (
upc INTEGER REFERENCES ProductInfo(upc),
sid INTEGER REFERENCES Stores(sid),
price FLOAT,
PRIMARY KEY (upc, sid)
);

CREATE TABLE Users (
    uid INTEGER PRIMARY KEY,
    login TEXT,
    hashpassword TEXT,
    name TEXT,
    lastLongitude TEXT,
    lastLatitude TEXT
);

CREATE TABLE OrderHistory (
    oid INTEGER PRIMARY KEY,
    uid INTEGER REFERENCES Users(uid),
);

CREATE TABLE ProductOrderHistory (
    oid INTEGER REFERENCES OrderHistory(oid),
    sid INTEGER REFERENCES Stores(sid),
    upc INTEGER REFERENCES ProductInfo(upc),
    quantity INTEGER,
    PRIMARY KEY (oid, sid, upc)
);

CREATE TABLE Coupons (
    cid INTEGER PRIMARY KEY,
    sid INTEGER REFERENCES Stores(sid),
    description TEXT,
    code TEXT,
    expiration DATE
);





