import { PodDisruptor } from 'k6/x/disruptor';
import http from 'k6/http';

export default function (data) {
    http.get(`http://139.59.194.118/delay/0.1`);
}

export function disrupt(data) {
    if (__ENV.SKIP_FAULTS == "1") {
        return
    }

    const selector = {
        namespace: "httpbin",
        select: {
            labels: {
                app: "httpbin"
            }
        }
    }
    const podDisruptor = new PodDisruptor(selector)

    // delay traffic from one random replica of the deployment
    const fault = {
        averageDelay: "60ms",
        errorCode: 500,
        errorRate: 0.1
    }
    podDisruptor.injectHTTPFaults(fault, "40s")
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
        disrupt: {
            executor: 'shared-iterations',
            iterations: 1,
            vus: 1,
            exec: "disrupt",
            startTime: "15s",
        },
    }
}
