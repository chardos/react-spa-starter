import { mount } from "enzyme";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import ZoneDashboard from "scenes/ZoneDashboard";
import ZoneManagement from "scenes/ZoneManagement";
import SignIn from "scenes/SignIn";
import NotFound from "scenes/NotFound";
import store from 'store';
import Routes from "./Routes";

const renderRoute = (url) => (
    <Provider store={store}>
        <MemoryRouter initialEntries={[url]}>
            <Routes />
        </MemoryRouter>
    </Provider>
)

describe('Routes when logged in', () => {
    beforeEach(() => {
        sessionStorage.setItem('id_token', 'eyJraWQiOiJoR2...');
    });

    afterEach(() => {
        sessionStorage.removeItem('id_token');
    });

    test("The root path should take you to the zone dashboard", () => {
        const wrapper = mount(
            renderRoute('/')
        );
        expect(wrapper.find(ZoneDashboard)).toHaveLength(1);
    });

    test("The zone management route should take you to the zone management page", () => {
        const wrapper = mount(
            renderRoute('/zones/:id')
        );

        expect(wrapper.find(ZoneManagement)).toHaveLength(1);
    });

    test("The add zone management route should take you to the zone management page", () => {
        const wrapper = mount(
            renderRoute('/zones/add')
        );

        expect(wrapper.find(ZoneManagement)).toHaveLength(1);
    });

    test("An invalid path should redirect to a Not Found page", () => {
        const wrapper = mount(
            renderRoute('/broken')
        );

        expect(wrapper.find(ZoneDashboard)).toHaveLength(0);
        expect(wrapper.find(NotFound)).toHaveLength(1);
    });
})

describe('Routes when logged out', () => {
    test("The zone dashboard page should take you to the sign in page", () => {
        const wrapper = mount(
            renderRoute('/zones')
        );

        expect(wrapper.find(SignIn)).toHaveLength(1);
    })

    test("The zone management page should take you to the sign in page", () => {
        const wrapper = mount(
            renderRoute('/zones/:id')
        );

        expect(wrapper.find(SignIn)).toHaveLength(1);
    })
});
