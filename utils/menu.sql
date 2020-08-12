CREATE TABLE IF NOT EXISTS dishes
(
    id         int unsigned unique auto_increment                              not null primary key,
    name       varchar(150) unique                                             not null,
    created_at timestamp default CURRENT_TIMESTAMP                             not null,
    updated_at timestamp default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP not null
);

CREATE TABLE IF NOT EXISTS navigation
(
    id         int unsigned unique auto_increment                              not null primary key,
    name       varchar(60)                                                     not null,
    created_at timestamp default CURRENT_TIMESTAMP                             not null,
    updated_at timestamp default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP not null
);

CREATE TABLE IF NOT EXISTS assortment
(
    id              int unsigned unique                                             not null auto_increment primary key,
    name            varchar(160) unique                                             not null,
    price           integer,
    waiting_time    integer,
    weight          int,
    apply_modifiers varchar(200),
    description     varchar(250),
    photo           varchar(250),
    active          boolean,
    dishes_name     varchar(150),
    created_at      timestamp default CURRENT_TIMESTAMP                             not null,
    updated_at      timestamp default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP not null,
    FOREIGN KEY (dishes_name)
        REFERENCES dishes (name)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS modifier
(
    id              int unsigned unique                                             not null auto_increment primary key,
    name            varchar(160)                                                    not null,
    weight          integer,
    price           integer,
    assortment_name varchar(250),
    created_at      timestamp default CURRENT_TIMESTAMP                             not null,
    updated_at      timestamp default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP not null,
    FOREIGN KEY (assortment_name)
        REFERENCES assortment (name)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS archiveModifier
(
    id          int unsigned unique                                             not null auto_increment primary key,
    name        varchar(120) unique,
    number_item int unsigned,
    created_at  timestamp default CURRENT_TIMESTAMP                             not null,
    updated_at  timestamp default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP not null
);


CREATE TABLE IF NOT EXISTS archiveItems
(
    id              int unsigned unique                                             not null auto_increment primary key,
    name            varchar(160) unique                                             not null,
    price           integer,
    waiting_time    integer,
    weight          int,
    apply_modifiers varchar(200),
    description     varchar(250),
    photo           varchar(250),
    active          boolean,
    dishes_name     varchar(150),
    number_modifier int,
    created_at      timestamp default CURRENT_TIMESTAMP                             not null,
    updated_at      timestamp default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP not null
);