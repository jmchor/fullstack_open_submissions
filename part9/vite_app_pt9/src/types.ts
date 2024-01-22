// types.ts

export interface CoursePartBase {
	name: string;
	exerciseCount: number;
}

export interface CoursePartBaseWithDescription extends CoursePartBase {
	description: string;
}

export interface CoursePartBasic extends CoursePartBaseWithDescription {
	kind: 'basic';
}

export interface CoursePartGroup extends CoursePartBase {
	groupProjectCount: number;
	kind: 'group';
}

export interface CoursePartBackground extends CoursePartBaseWithDescription {
	backgroundMaterial: string;
	kind: 'background';
}

export interface CoursePartRequirements extends CoursePartBaseWithDescription {
	requirements: string[];
	kind: 'special';
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartRequirements;

export const assertNever = (value: never): never => {
	throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};
