type Incident = {
    _path: string;
    title: string;
    componentsAffected: string[];
    identified: string;
    severity: string;
    steps: IncidentStep[];
};
