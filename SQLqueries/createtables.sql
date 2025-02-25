DROP TABLE IF EXISTS frugaldatabase.StoreProducts;
DROP TABLE IF EXISTS frugaldatabase.Stores;
DROP TABLE IF EXISTS frugaldatabase.ProductInfo;
/*DROP TABLE IF EXISTS FrugalFinderDB.Users;
DROP TABLE IF EXISTS FrugalFinderDB.OrderHistory;
DROP TABLE IF EXISTS FrugalFinderDB.ProductOrderHistory;
DROP TABLE IF EXISTS FrugalFinderDB.Coupons;*/

CREATE TABLE Stores (
sid INTEGER PRIMARY KEY AUTO_INCREMENT,
name TEXT NOT NULL,
address TEXT,
longitudeStore TEXT,
latitudeStore TEXT
);

CREATE TABLE ProductInfo (
pid INTEGER PRIMARY KEY AUTO_INCREMENT,
name TEXT NOT NULL
);

CREATE TABLE StoreProducts (
pid INTEGER REFERENCES ProductInfo(pid),
sid INTEGER REFERENCES Stores(sid),
price FLOAT,
searchQuery TEXT,
imagePath TEXT,
PRIMARY KEY (pid, sid)
);

/*
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
);*/