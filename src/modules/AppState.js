// @flow
type AppStateType = {
  isFirstOpen: boolean,
  userInfo: Object
};

type ActionType = {
  type: string,
  payload?: any,
};

export const initialState: AppStateType = {
  isFirstOpen: true,
  LOGIN_STATUS:null,
  userInfo: {},
  isCustomerScreenRefersh:true,
  isPageRefersh:true,
  isHeaderRightIconShow:false,
  customerEditData:false,
  editData:false,
  ItemInInvoice:[],
  backScreen:'',
  active_photo_tab:'',
  update_photo_data:[],
  before_photos:[],
  after_photos:[],
  other_photos:[],
  selected_categories:[],
};

export const SET_FIRST_OPEN = 'AppState/SET_FIRST_OPEN';
export const LOGIN_STATUS = 'AppState/LOGIN_STATUS';
export const SET_USER_INFO = 'AppState/SET_USER_INFO';
export const SET_CUSTOMERS_REFERSH = 'AppState/SET_CUSTOMERS_REFERSH';
export const SET_PAGE_REFERSH = 'AppState/SET_PAGE_REFERSH';
export const SET_EDIT_DATA = 'AppState/SET_EDIT_DATA';
export const SET_RIGHT_ICON_SHOW = 'AppState/SET_RIGHT_ICON_SHOW';
export const SET_CUSTOMERS_EDIT_DATA = 'AppState/SET_CUSTOMERS_EDIT_DATA';

export const SET_ITEMS_INVOICES = 'AppState/SET_ITEMS_INVOICES';
export const SET_BACK_SCREEN = 'AppState/SET_BACK_SCREEN';


export const BEFORE_PHOTOS = 'AppState/BEFORE_PHOTOS';
export const AFTER_PHOTOS = 'AppState/AFTER_PHOTOS';
export const OTHER_PHOTOS = 'AppState/OTHER_PHOTOS';
export const UPDATE_PHOTO_DATA = 'AppState/UPDATE_PHOTO_DATA';


export const ACTIVE_PHOTO_TAB = 'AppState/ACTIVE_PHOTO_TAB';

export const SELECTED_CATEGORIES = 'AppState/SELECTED_CATEGORIES';


 
export function setAppOpened(): ActionType {
  return {
    type: SET_FIRST_OPEN,
  };
}

export default function AppStateReducer(
  state: AppStateType = initialState,
  action: ActionType,
): AppStateType {
  switch (action.type) {
    case SET_FIRST_OPEN:
      return {
        ...state,
        isFirstOpen: false,
      };
    case LOGIN_STATUS:
       console.log('LOGIN_STATUS')
       return {
         ...state
       }
    case SET_USER_INFO:
      return {
        ...state,
        userInfo: action.data
      };
    case SET_CUSTOMERS_REFERSH:
      return {
        ...state,
        isCustomerScreenRefersh: action.data
      };
    case SET_PAGE_REFERSH:
      return {
        ...state,
        isPageRefersh: action.data
      };

    case SET_RIGHT_ICON_SHOW:
      return {
        ...state,
        isHeaderRightIconShow: action.data
      };  
    case SET_CUSTOMERS_EDIT_DATA:
      return {
        ...state,
        customerEditData: action.data
      };  

    case SET_EDIT_DATA:
      return {
        ...state,
        editData: action.data
      }; 
    
    case SET_ITEMS_INVOICES:
      return {
        ...state,
        ItemInInvoice: action.data
      }; 
    case SET_BACK_SCREEN:
      return {
        ...state,
        backScreen: action.data
      }; 

    case BEFORE_PHOTOS:
      return {
        ...state,
        before_photos: action.data
      }; 

    case AFTER_PHOTOS:
      return {
        ...state,
        after_photos: action.data
      }; 

    case OTHER_PHOTOS:
      return {
        ...state,
        other_photos: action.data
      }; 
    case ACTIVE_PHOTO_TAB:
      return {
        ...state,
        active_photo_tab: action.data
      }; 
    case UPDATE_PHOTO_DATA:
      return {
        ...state,
        update_photo_data: action.data
      }; 
    case SELECTED_CATEGORIES:
      return {
        ...state,
        selected_categories: action.data
      }; 


            
    default:
      return state;
  }
}
