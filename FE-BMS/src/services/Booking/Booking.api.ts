import { baseApi } from 'services/BaseApi';

import { API_TAGS, API_URL } from '@constant';

import {
    BookingApiRequestType,
    BookingApiResponseType,
    SeatApiResponseType,
    SlotDetailsApiResponseType,
} from './Booking.types';

/**
 * It consists of booking endpoints
 */
export const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        /**
         * It takes id and returns the details of slot
         */
        slotDetails: builder.query<SlotDetailsApiResponseType, string>({
            query: (id) => ({
                url: `${API_URL.SLOT}${encodeURIComponent(id)}`,
                method: 'GET',
            }),
        }),
        /**
         * It takes the id of the slot and returns seats of that slot
         */
        seats: builder.query<SeatApiResponseType, string>({
            query: (id) => ({
                url: `${API_URL.SLOT}${encodeURIComponent(id)}/seats`,
                method: 'GET',
            }),
            providesTags: [API_TAGS.SEATS],
        }),
        /**
         * It takes slot id, seat number and booked the seat for the user
         */
        booking: builder.mutation<
            BookingApiResponseType,
            BookingApiRequestType
        >({
            query: (data) => ({
                url: API_URL.BOOKING,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: [API_TAGS.SEATS],
        }),
    }),
});

export const { useSlotDetailsQuery, useSeatsQuery, useBookingMutation } =
    bookingApi;
