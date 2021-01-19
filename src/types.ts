import * as React from 'react';

export type NannyNode = React.ReactNode & { props: Record<string, unknown>, type: any };