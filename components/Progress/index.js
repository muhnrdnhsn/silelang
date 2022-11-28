/*
    props: {
        steps: [
            {
                icon: string,
                label: string,
            }
        ],
        currentStep: number[0..n-1]
    }
*/

import { useMemo } from "react";

export default function Progress(props){
    const currentStep = useMemo(() => props.currentStep ?? 0, [props.currentStep])
    const currentStepLabel = useMemo(() => props.steps[currentStep].label, [props.steps, currentStep])
    const nextStepLabel = useMemo(() => {
        if(currentStep+1 === props.steps.length) return 'Finish'
        return props.steps[currentStep+1].label
    }, [props.steps, currentStep])
    return(
        <div className="w-full">
            <p className="text-teal-400 font-bold text-md md:text-lg lg:text-xl xl:text-2xl">{currentStep+1} of {props.steps.length}</p>
            <h4 className="text-white text-xl font-bold lg:text-2xl xl:text-3xl">{currentStepLabel}</h4>
            <h4 className="text-gray-400 text-sm md:text-md lg:text-lg xl:text-xl mb-4">Selanjutnya: {nextStepLabel}</h4>
            <div className="w-full grid grid-flow-col gap-3">
                {
                props.steps.map((step, idx) => (
                    <div key={`steo-${idx}`} className="w-full">
                            <div className={["border-t-2", idx <= currentStep ? "border-teal-400" : "border-gray-400"].join(" ")}></div>
                    </div>
                )) 
                }
            </div>
        </div>
    )
}