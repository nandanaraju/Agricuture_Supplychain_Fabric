
let profile = {
    manufacturer: {
        "cryptoPath": "../../Network/organizations/peerOrganizations/manufacturer.agri.com", 
		"keyDirectoryPath": "../../Network/organizations/peerOrganizations/manufacturer.agri.com/users/User1@manufacturer.agri.com/msp/keystore/",
        "certPath":     "../../Network/organizations/peerOrganizations/manufacturer.agri.com/users/User1@manufacturer.agri.com/msp/signcerts/cert.pem",
		"tlsCertPath":  "../../Network/organizations/peerOrganizations/manufacturer.agri.com/peers/peer0.manufacturer.agri.com/tls/ca.crt",
		"peerEndpoint": "localhost:7051",
		"peerHostAlias":  "peer0.manufacturer.agri.com",
        "mspId": "manufacturerMSP"
    },
    wholesaler: {
        "cryptoPath": "../../Network/organizations/peerOrganizations/wholesaler.agri.com", 
		"keyDirectoryPath": "../../Network/organizations/peerOrganizations/wholesaler.agri.com/users/User1@wholesaler.agri.com/msp/keystore/",
        "certPath":     "../../Network/organizations/peerOrganizations/wholesaler.agri.com/users/User1@wholesaler.agri.com/msp/signcerts/cert.pem",
		"tlsCertPath":  "../../Network/organizations/peerOrganizations/wholesaler.agri.com/peers/peer0.wholesaler.agri.com/tls/ca.crt",
		"peerEndpoint": "localhost:9051",
		"peerHostAlias":  "peer0.wholesaler.agri.com",
        "mspId": "wholesalerMSP"
    },
    distributer: {
        "cryptoPath": "../../Network/organizations/peerOrganizations/distributer.agri.com", 
		"keyDirectoryPath": "../../Network/organizations/peerOrganizations/distributer.agri.com/users/User1@distributer.agri.com/msp/keystore/",
        "certPath":     "../../Network/organizations/peerOrganizations/distributer.agri.com/users/User1@distributer.agri.com/msp/signcerts/cert.pem",
		"tlsCertPath":  "../../Network/organizations/peerOrganizations/distributer.agri.com/peers/peer0.distributer.agri.com/tls/ca.crt",
		"peerEndpoint": "localhost:8051",
		"peerHostAlias":  "peer0.distributer.agri.com",
        "mspId": "distributerMSP"
    },
    market: {
        "cryptoPath": "../../Network/organizations/peerOrganizations/market.agri.com", 
		"keyDirectoryPath": "../../Network/organizations/peerOrganizations/market.agri.com/users/User1@market.agri.com/msp/keystore/",
        "certPath":     "../../Network/organizations/peerOrganizations/market.agri.com/users/User1@market.agri.com/msp/signcerts/cert.pem",
		"tlsCertPath":  "../../Network/organizations/peerOrganizations/market.agri.com/peers/peer0.market.agri.com/tls/ca.crt",
		"peerEndpoint": "localhost:11051",
		"peerHostAlias":  "peer0.market.agri.com",
        "mspId": "marketMSP"
    }
}
module.exports = { profile }
