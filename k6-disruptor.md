# Install xk6
go install go.k6.io/xk6/cmd/xk6@latest

# Clone the xk6-disruptor code
git clone https://github.com/grafana/xk6-disruptor.git
cd xk6-disruptor

# Build the custom binary 
xk6 build --output xk6-disruptor --with github.com/grafana/xk6-disruptor=. --with github.com/grafana/xk6-kubernetes
