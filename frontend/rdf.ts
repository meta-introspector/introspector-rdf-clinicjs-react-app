interface RdfId {
    id: string
}

export interface RdfObject {
    _subject: RdfId;
    _predicate: RdfId;
    _object: RdfId;
}
