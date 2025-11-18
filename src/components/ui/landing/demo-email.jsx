import Image from "next/image"

export function DemoEmail() {
    return (
        <div className="bg-pink-200 w-[1000px] h-[800px]">
            <div className="flex items-center">
                <div className="bg-black border w-[50px] h-[50px] flex items-center justify-center rounded-full ">
                     <img
                    src="/images/neuraletter_logo.png"
                    alt="Logo"
                    width={24}
                    height={24}
                    className=""
                  />
                </div>

                <div className="ms-4">
                    <p className="flex items-center gap-2 "><span className="font-medium text-[18px]">NeuraLetter</span>{" "}<span>{" ("}30 minutes ago{")"}</span></p>
                    <div className="flex items-center">
                        <p>to me</p>
                        <img
                    src="/images/icons/arrow_drop_down.svg"
                    alt="Logo"
                    width={24}
                    height={24}
                    className="invert"
                  />

                    </div>
                    
                </div>
            </div>
            <div className="mt-10">

                <h4 className="text-2xl" >Your updates on<span className="font-bold">"Recent Advances in Deep Learning, Reinforcement Learning, NLP, and Computer Vision: Papers Published Recently"</span> </h4>

                <div>

                    

                </div>
            </div>
        </div>
    )
}