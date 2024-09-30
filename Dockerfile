FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY frontend .
# fold the frontend into app for this container
RUN npm ci
RUN npm run build


FROM python:3.10-slim AS backend
WORKDIR /app

RUN apt-get update && apt-get install --no-install-recommends -y \
    git curl  \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN useradd -m -u 1000 user

COPY ./requirements.txt .
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

USER user
ENV HOME=/home/user \
    PATH=/home/user/.local/bin:$PATH


WORKDIR $HOME/app
COPY --from=builder /app/build ./static
COPY app.py app.py

CMD ["python", "app.py"]

