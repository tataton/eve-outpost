/**
 * Sets access scopes for auth types.
 */
const access = {
    authonly: {
        authScopes: []
    },
    read: {
        authScopes: [
            'esi-search.search_structures.v1',
            'esi-universe.read_structures.v1',
            'esi-markets.structure_markets.v1'
        ]
    },
    write: {
        authScopes: [
            'esi-search.search_structures.v1',
            'esi-universe.read_structures.v1',
            'esi-markets.structure_markets.v1',
            'esi-assets.read_assets.v1',
            'esi-markets.read_character_orders.v1'
        ]
    }
};

module.exports = access;