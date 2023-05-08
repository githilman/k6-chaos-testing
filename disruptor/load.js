import { PodDisruptor } from 'k6/x/disruptor';
import http from 'k6/http';

export default function (data) {
    http.get(`http://139.59.194.118/delay/0.1`);
}

export const options = {
    scenarios: {
        load: {
            executor: 'constant-arrival-rate',
            rate: 100,
            preAllocatedVUs: 10,
            maxVUs: 100,
            exec: "default",
            startTime: '0s',
            duration: "60s",
        },
    }
}
