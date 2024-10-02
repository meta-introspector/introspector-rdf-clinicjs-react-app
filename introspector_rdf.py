import rdflib
import json
g = rdflib.Graph()
g.parse("./introspector.ttl")

knows_query = """
SELECT DISTINCT ?aname ?bname
WHERE {
    ?a  ?b .
    ?a foaf:name ?aname .
    ?b foaf:name ?bname .
}"""

def data():
    # qres = g.query(knows_query)
    res = []
    for x in g:
        res.append(x)
    return res

if __name__ == "__main__":
    
    print(json.dumps(data(),indent=2))
