class APIException(Exception):
    def __init__(self, message, status_code=400):
        super().__init__()
        self.message = message
        self.status_code = status_code

    def to_dict(self):
        return {"message": self.message}

def generate_sitemap(app):
    import urllib.parse
    output = []
    for rule in app.url_map.iter_rules():
        methods = ','.join(rule.methods)
        url = urllib.parse.unquote(f"{rule}")
        line = {"endpoint": rule.endpoint, "methods": methods, "url": url}
        output.append(line)
    return {"endpoints": output}
