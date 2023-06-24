import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ColorThief from "colorthief";
import './App.css'
import {DropzoneComponent} from "./components/DropzoneComponent.jsx";

function App() {
    const [color, setColor] = useState([]);
    const [palette, setPalette] = useState([]);

    function handleClick() {
        const target = document?.querySelector(".colorthief-target");
        if (!target) {
            console.warn("No target image found")
            return;
        }
        const colorThief = new ColorThief();

        function fetchColor() {
            return colorThief.getColor(target);
        }

        function fetchPalette() {
            return colorThief.getPalette(target, 4);
        }

        setColor(fetchColor())
        setPalette(fetchPalette())
    }

    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://react.dev" target="_blank" rel="noreferrer">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1 className="text-4xl font-bold mb-[1em]">Vite + React</h1>
            <DropzoneComponent/>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
            <button onClick={handleClick} style={{
                backgroundColor: `rgb(${color.join(',')})`
            }}>Get Colors
            </button>
            <div className="flex justify-between w-[500px] mx-auto mt-2">
                {
                    !!palette.length && palette.map((paletteColor, index) => (
                        <div key={paletteColor.join('') + index} style={{
                            backgroundColor: `rgb(${paletteColor.join(',')})`,
                            width: '50px',
                            height: '50px',
                            borderRadius: "50%",
                        }}></div>
                    ))
                }
            </div>
        </>
    )
}

export default App
