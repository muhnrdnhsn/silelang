/*
    props : {
        tabs: [
            {
                label: string,
                value: string
            }
        ],
        activeTab?: string in tabs.value <default value[0]>,
        onChange: function(value)
    }
*/

import { useEffect, useState } from "react"

export default function Tabs(props){
    const {tabs, activeTab, onChange} = props

    const [activeTabState, setActiveTabState] = useState(tabs[0].value)

    useEffect(() => {
        setActiveTabState(activeTab)
    }, [activeTab])

    const getTabClass = (tab) => {
        const requiredClass = "w-full py-2 rounded-lg cursor-pointer"
        const activeClass = "bg-teal-400"
        return [requiredClass, activeTabState === tab ? activeClass : ""].join(" ")
    }

    const getActiveTabIndex = () => {
        return tabs.findIndex(tab => tab.value === activeTabState)
    }

    const getTabContentClass = (idx) => {
        const requiredClass = "w-full"
        const borderClass = "border-r-2 border-r-white"
        const activeIndex = getActiveTabIndex()
        const hasBorder = idx+1 < tabs.length && idx+1 !== activeIndex && idx !== activeIndex
        return [requiredClass, hasBorder ? borderClass : ''].join(" ")
    }

    const onClickTab = (tab) => {
        setActiveTabState(tab)
        if(onChange){
            onChange(tab)
        }
    }

    return (
        <ul className="w-full mx-auto flex flex-nowrap items-center justify-between bg-gray-400 text-white rounded-lg font-bold tracking-widest text-center">
            {
                tabs.map((tab, idx) => (
                    <li key={`tab-${tab.value}`} className={getTabClass(tab.value)} onClick={() => onClickTab(tab.value)}>
                        <div className={getTabContentClass(idx)}>{tab.label}</div>
                    </li>
                ))
            }
        </ul>
    )
}