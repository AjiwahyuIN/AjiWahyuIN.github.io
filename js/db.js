const dbPromised = idb.open("football", 1, upgradeDb => {


    const teamObjectStore = upgradeDb.createObjectStore("teams", {
        keyPath: "ID"
    });
    teamObjectStore.createIndex("name", "name", {
        unique: false
    });
    teamObjectStore.createIndex("crestUrl", "crestUrl", {
        unique: false
    });
    teamObjectStore.createIndex("venue", "venue", {
        unique: false
    });
    teamObjectStore.createIndex("address", "address", {
        unique: false
    });
    teamObjectStore.createIndex("phone", "phone", {
        unique: false
    });
    teamObjectStore.createIndex("website", "website", {
        unique: false
    });
});

function favoriteTeam(team) {
    dbPromised
        .then(db => {
            const tx = db.transaction("teams", "readwrite");
            const store = tx.objectStore("teams");
            store.put({
                'ID': team.id,
                'name': team.name,
                'crestUrl': team.crestUrl,
                'venue': team.venue,
                'address': team.address,
                'phone': team.phone,
                'website': team.website
            });
            return tx.complete;
        }).then(() => {
            M.toast({
                html: "team berhasil disimpan"
            });
        }).catch((e) => {
            console.log(e);

        })

}

function getAllTeam() {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(db => {
                const tx = db.transaction("teams", "readonly");
                const store = tx.objectStore("teams");
                return store.getAll();
            })
            .then(teams => {
                resolve(teams);
            });
    });
}

function deleteTeam(id) {
    dbPromised.then(db => {
        const tx = db.transaction("teams", "readwrite");
        const store = tx.objectStore("teams");
        store.delete(id);
        return tx.complete;
    }).then(() => {
        M.toast({
            html: 'Team telah dihapus'
        })
        location.reload();
    })
}