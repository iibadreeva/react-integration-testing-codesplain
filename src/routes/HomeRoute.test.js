import {render, screen} from "@testing-library/react";
// import {setupServer} from "msw/node";
// import {rest} from "msw";
import {MemoryRouter} from "react-router-dom";
import HomeRoute from "./HomeRoute";
import {createServer} from "../test/server";

createServer([
    {
        path: '/api/repositories',
        methhod: 'get',
        res: (req, res, ctx) => {
            const [,language] = req.url.searchParams.get('q').split('language:');
            // console.log(language);
            return {
                items: [
                    {id: 1, full_name: `${language}_one`},
                    {id: 2, full_name: `${language}_two`},
                ]
            }
        }
    }
])

// const handlers = [
//     rest.get('/api/repositories', (req, res, ctx) => {
//         const [,language] = req.url.searchParams.get('q').split('language:');
//         // console.log(language);
//
//         return res(
//             ctx.json({
//                 items: [
//                     {id: 1, full_name: `${language}_one`},
//                     {id: 2, full_name: `${language}_two`},
//                 ]
//             })
//         )
//     })
// ]
//
// const server = setupServer(...handlers);
// beforeAll(() => {
//     server.listen()
// })
// afterEach(() => {
//     server.resetHandlers()
// })
// afterAll(() => {
//     server.close()
// })

test('renders two links for each language', async () => {
    render(
        <MemoryRouter>
            <HomeRoute />
        </MemoryRouter>
    )
    // await pause()
    // screen.debug()

    const languages = [
        'javascript',
        'typescript',
        'rust',
        'go',
        'python',
        'java',
    ]
    for(const language of languages){
        const links = await screen.findAllByRole('link',{
            name: new RegExp(`${language}_`)
        })
        expect(links).toHaveLength(2)
        expect(links[0]).toHaveTextContent(`${language}_one`)
        expect(links[1]).toHaveTextContent(`${language}_two`)
        expect(links[0]).toHaveAttribute('href', `/repositories/${language}_one`)
        expect(links[1]).toHaveAttribute('href', `/repositories/${language}_two`)
    }
})

const pause = () => new Promise((resolve) => {
    setTimeout(resolve, 100)
})