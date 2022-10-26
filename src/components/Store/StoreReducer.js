
import { LOAD_PRODUCTS, SET_INFO_ACCOUNT } from "./StoreConst"

const initState = {
    products: [],
    account: {
        id_account: 0,
        id_staff: 0,
        id_customer: 0,
        role: '',
        picture_link_avatar: '',
        picture_char: '',
        name_customer: '',
        phone_number_customer: '',
        gender_customer: '',
        "date_of_birth_customer": "",
        "identity_card_customer": "",
        "gender_customer": "female",
        "register_date": "",
        "email_customer": "",
        "name_staff": '',
        "email_staff": '',
        "position": '',
        "phone_number_staff": '',
        "address_staff": '',
        "gender_staff": '',
        "create_date": '',
        "identity_card_staff": ''
    }
}

function StoreReducer(state, action) {
    switch (action.type) {
        case LOAD_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }
        case SET_INFO_ACCOUNT:
            return {
                ...state,
                account: action.payload
            }
        default:
            throw new Error('Invalid Action.')
    }
}

export { initState }
export default StoreReducer