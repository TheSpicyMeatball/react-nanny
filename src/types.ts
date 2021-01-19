import * as React from 'react';

export type NannyNode = React.ReactNode & { props: Record<string, unknown>, type: any };

export interface IDescendantDepth<T=React.ReactNode>{ ancestor: T, depthToMatch: number }