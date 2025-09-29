import { FONT_MATRIX } from "@/common/js/fontMatrix";
import { Manuscript } from "khoshnus"
import 'khoshnus/style.css'
import React, { useState, useEffect } from 'react';

export default function Calligraphy({ id = "test", str = "sample", color = "#d1177dff", font = "Parisienne", fontSize = 15, speed = 150, delay = 0, className = "" }) {
    useEffect(() => {
        const manuscript = new Manuscript({
            svgId: id,
            font: FONT_MATRIX[font].name,
            fontSize: `${fontSize}px`,
            start: {
                startStroke: color,
                startStrokeDashoffset: FONT_MATRIX[font].strokeDashoffset,
            },
            end: {
                endFill: color,
            },
        });

        const textId = manuscript.write(str, {
            writeConfiguration: { eachLetterDelay: speed, delayOperation: delay },
        });
        // 삭제시
        // manuscript.erase(textId, { delayOperation: 15000 })
    }, [id, str, color, font, fontSize, speed, delay]);

    return (
        <svg className={`${className}`} id={id} width="100%" viewBox="0 0 100 30" xmlns="http://www.w3.org/2000/svg"></svg>
    )
}