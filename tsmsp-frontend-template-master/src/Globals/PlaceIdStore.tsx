import create from 'zustand'

export const PlaceIdStore = create(() => ({
    PlaceId : ''
}))

export const setPlaceId= (placeId: string) => PlaceIdStore.setState({ PlaceId: placeId })
export const clearPlaceId= () => PlaceIdStore.setState({ PlaceId: '' })
