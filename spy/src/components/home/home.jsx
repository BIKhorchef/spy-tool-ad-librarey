import React from "react";
import AdsPage from "../ads/ads";


export default function Home() {
    return (
        <div>
            <h1 className="text-3xl font-bold underline">
                Hello world!
            </h1>
            {/* button to go to ads */}
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <AdsPage />
            </button>
        </div>
    );
}