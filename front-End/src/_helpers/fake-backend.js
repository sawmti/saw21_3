import { Role } from './'

export function configureFakeBackend() {
    // array in local storage for user records
    let users = JSON.parse(localStorage.getItem('users')) || [{ 
        id: 1,
        title: 'Mr',
        firstName: 'Joe',
        lastName: 'Bloggs',
        email: 'joe@bloggs.com',
        role: Role.User,
        password: 'joe123'
    }];

    let areas = JSON.parse(localStorage.getItem('areas')) || [{ 
        codigo: 'S',
        nombre: 'Sur',
        eje: 'E'
    }];

    // monkey patch fetch to setup fake backend
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(handleRoute, 500);

            function handleRoute() {
                const { method } = opts;
                switch (true) {
                    case url.endsWith('/users') && method === 'GET':
                        return getUsers();
                    case url.match(/\/users\/\d+$/) && method === 'GET':
                        return getUserById();
                    case url.endsWith('/users') && method === 'POST':
                        return createUser();
                    case url.match(/\/users\/\d+$/) && method === 'PUT':
                        return updateUser();
                    case url.match(/\/users\/\d+$/) && method === 'DELETE':
                        return deleteUser();
                    
                    case url.endsWith('/area') && method === 'GET':
                        return getAreas();
                    case url.match(/\/area\/\d+$/) && method === 'GET':
                        return getAreaById();
                    case url.endsWith('/area') && method === 'POST':
                        return createArea();
                    case url.match(/\/area\/\d+$/) && method === 'PUT':
                        return updateArea();
                    case url.match(/\/area\/\d+$/) && method === 'DELETE':
                        return deleteArea();
                    
                    default:
                        // pass through any requests not handled above
                        console.log("pegandole a url: "+url);
                        return realFetch(url, opts)
                            .then(response => resolve(response))
                            .catch(error => reject(error));
                }
            }

            // route functions

            function getUsers() {
                return ok(users);
            }

            function getUserById() {
                let user = users.find(x => x.id === idFromUrl());
                return ok(user);
            }
    
            function createUser() {
                const user = body();

                if (users.find(x => x.email === user.email)) {
                    return error(`User with the email ${user.email} already exists`);
                }

                // assign user id and a few other properties then save
                user.id = newUserId();
                user.dateCreated = new Date().toISOString();
                delete user.confirmPassword;
                users.push(user);
                localStorage.setItem('users', JSON.stringify(users));

                return ok();
            }
    
            function updateUser() {
                let params = body();
                let user = users.find(x => x.id === idFromUrl());

                // only update password if included
                if (!params.password) {
                    delete params.password;
                }
                // don't save confirm password
                delete params.confirmPassword;

                // update and save user
                Object.assign(user, params);
                localStorage.setItem('users', JSON.stringify(users));

                return ok();
            }
    
            function deleteUser() {
                users = users.filter(x => x.id !== idFromUrl());
                localStorage.setItem('users', JSON.stringify(users));

                return ok();
            }
    
            function getAreas() {
                return ok(areas);
            }

            function getAreaById() {
                let area = areas.find(x => x.codigo === idFromUrl());
                return ok(area);
            }
    
            function createArea() {
                const area = body();

                if (areas.find(x => x.codigo === area.codigo)) {
                    return error(`Ya existe área con código ${area.codigo}.`);
                }
                areas.push(area);
                localStorage.setItem('areas', JSON.stringify(areas));

                return ok();
            }
    
            function updateArea() {
                let params = body();
                let area = areas.find(x => x.codigo === idFromUrl());

                // update and save user
                Object.assign(area, params);
                localStorage.setItem('areas', JSON.stringify(areas));

                return ok();
            }
    
            function deleteUser() {
                areas = areas.filter(x => x.codigo !== idFromUrl());
                localStorage.setItem('areas', JSON.stringify(areas));

                return ok();
            }





            // helper functions

            function ok(body) {
                resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) });
            }

            function error(message) {
                resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) });
            }

            function idFromUrl() {
                const urlParts = url.split('/');
                return parseInt(urlParts[urlParts.length - 1]);
            }

            function body() {
                return opts.body && JSON.parse(opts.body);    
            }

            function newUserId() {
                return users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
            }
        });
    }
};