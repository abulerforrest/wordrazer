import {
	WidthProperty, 
	HeightProperty, 
	MarginProperty,
	LetterSpacingProperty
} from "csstype";

export type ComponentColor = string
export type ComponentSize = "small" | "medium" | "large";
export type ComponentHeight = HeightProperty<number>
export type ComponentWidth = WidthProperty<number>
export type ComponentMargin = MarginProperty<number>
export type ComponentLetterSpacing = LetterSpacingProperty<string>