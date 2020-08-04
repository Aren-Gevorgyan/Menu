CREATE TABLE IF NOT EXISTS dishes
(
    id            int unsigned unique auto_increment                              not null primary key,
    name          varchar(60)                                                     not null,
    assortment_id bigint unsigned,
    created_at    timestamp default CURRENT_TIMESTAMP                             not null,
    updated_at    timestamp default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP not null
);

CREATE TABLE IF NOT EXISTS navigation
(
    id            int unsigned unique auto_increment                              not null primary key,
    name          varchar(60)                                                     not null,
    created_at    timestamp default CURRENT_TIMESTAMP                             not null,
    updated_at    timestamp default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP not null
)