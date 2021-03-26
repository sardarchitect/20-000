import React, { useEffect, useMemo, useState } from 'react'
import { useTransition, a } from 'react-spring';
import data from './grid-data.js';
import shuffle from 'lodash/shuffle';
import useMeasure from './useMeasure'
import useMedia from './useMedia'

export const Grid = () => {

    const columns = useMedia([])
    const [bind, {width}] = useMeasure()
    const [items, set] = useState(data)
    useEffect(() => void setInterval(() => set(shuffle, 2000), []))
    const [heights, gridItems] = useMemo(() => {
        let heights = new Array(columns).fill(0)
        let gridItems = items.map((child, i) => {
            const column = heights.indexOf(Math.min(...heights))
            const xy = [(width / columns) * column, (heights[column] += child.height / 2) - child.height / 2]
            return {...child, xy, width: width / columns, height: child.height / 2}
        })
        return [heights, gridItems]
    }, [columns, items, width])

    const transitions = useTransition(gridItems, (item) => item.css, {
        from: ({ xy, width, height }) => ({ xy, width, height, opacity: 0 }),
        enter: ({ xy, width, height }) => ({ xy, width, height, opacity: 1 }),
        update: ({ xy, width, height }) => ({ xy, width, height }),
        leave: { height: 0, opacity: 0 },
        config: { mass: 5, tension: 500, friction: 100 },
        trail: 25
    })
    
    return(
        <div className="grid">
    <div {...bind} class="list" style={{ height: Math.max(...heights) }}>
      {transitions.map(({ item, props: { xy, ...rest }, key }) => (
        <a.div key={key} style={{ transform: xy.interpolate((x, y) => `translate3d(${x}px,${y}px,0)`), ...rest }}>
          <div style={{ backgroundImage: item.css }} />
        </a.div>
      ))}
    </div>
        </div>
    )
}



