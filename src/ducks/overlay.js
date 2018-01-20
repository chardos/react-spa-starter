const SHOW_OVERLAY = 'overlay/SHOW_OVERLAY';
const HIDE_OVERLAY = 'overlay/HIDE_OVERLAY';

const defaultState = {
    isShowing: false,
    onClick: null
}

// Reducer
export default function reducer(state = defaultState, action = {}) {
    switch (action.type) {
        case SHOW_OVERLAY:
            return {
                onClick: action.onClickCallback,
                isShowing: true
            }
        case HIDE_OVERLAY:
            return {
                onClick: null,
                isShowing: false
            }
        default: return state;
    }
}

// Action Creators
export function showOverlay(onClickCallback) {
    return {
        type: SHOW_OVERLAY,
        onClickCallback,
    }
}

export function hideOverlay() {
    return {
        type: HIDE_OVERLAY,
    }
}
