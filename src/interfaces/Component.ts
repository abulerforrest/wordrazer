import * as CSS from 'csstype';

export type ComponentColor = string;
export type ComponentSize = 'small' | 'medium' | 'large';
export type ComponentHeight = CSS.Property.Height<number>;
export type ComponentWidth = CSS.Property.Width<number>;
export type ComponentMargin = CSS.Property.Margin<number>;
export type ComponentLetterSpacing = CSS.Property.LetterSpacing<string>;
