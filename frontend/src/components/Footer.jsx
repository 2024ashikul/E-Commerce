

export default function Footer(){

    function alertSubscribe(){
        console.log('hi');
        document.getElementById('alert').style.visibility = 'visible';
    }

    return (
        <>
            <div className="bg-gray-400 grid grid-cols-3 p-4 gap-20 mt-4">
                <div>
                   <div className="text-2xl">Address</div>
                   <div className="flex text-justify">
                        9020-Pahartali,<br></br>
                        Cuet, Chattogram
                           
                           
                   </div>
                   <div>
                        Phone - 01581758574
                   </div>
                   <div>
                        Email - 2024ashikul@gmail.com
                   </div>
                </div>
                
                <div>
                    <div className="text-2xl">Get in touch with us!</div>
                    <div className="flex overflow-hidden">Social media icons</div>
                    <div className="text-[20px]"> Subscribe to our newsletter</div>
                    <button className="bg-amber-500 px-6 py-2 rounded-1xl border" onClick={alertSubscribe}>
                        Subscribe
                        <div className=" hidden max-h-96 max-w-64" id="alert">
                            <input></input>
                            <button>ok</button>
                        </div>

                    </button>
                </div>
                <div>
                    <p>About us</p>
                    <p>Terms and Conditions</p>
                    <p>Affiliate Program</p>
                    <p>Contact Us</p>
                    

                </div>
            </div>
        </>
    )
}